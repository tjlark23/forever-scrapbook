// ====== MANIFESTS ======
let manifests = {};

// Load manifests then init
(async function(){
  for(const yr of Y){
    if(yr.hasPhotos){
      try{
        const r=await fetch('photos/'+yr.y+'/manifest.json');
        if(r.ok) manifests[yr.y]=await r.json();
      }catch(e){console.warn('No manifest for '+yr.y);}
    }
  }
  buildTimeline();
  buildCorkboard();
  initObs();
  setupTimelinePhotos();
})();

// ====== BUILD TIMELINE (exact v11 structure) ======
function buildTimeline(){
  const tl=document.getElementById('timeline');
  Y.forEach(function(yr,i){
    const sd=i%2===0?'l':'r';
    tl.innerHTML+='<div class="ye '+sd+'" data-ay><div class="yd"></div>'+
    '<div class="yps"><div class="ypw"><div class="yhi '+yr.c+'">📷<span class="pcb">'+yr.ct+' photos</span></div>'+
    '<div class="ms"><div class="mt '+TC[(i*3)%7]+'"></div><div class="mt '+TC[(i*3+1)%7]+'"></div><div class="mt '+TC[(i*3+2)%7]+'"></div><div class="mt '+TC[(i*3+3)%7]+'"></div></div></div></div>'+
    '<div class="yis"><div class="yn">'+yr.y+'</div><div class="yhl">'+yr.h+'</div><p class="ysm">'+yr.s+'</p><p class="ynt">'+yr.n+'</p>'+
    '<button class="eb" onclick="openYear(\''+yr.y+'\')">Open scrapbook <span class="ar">→</span></button></div></div>';
  });
}

// ====== CORKBOARD (exact v11 positioning) ======
function buildCorkboard(){
  const board=document.getElementById('corkboard');
  const photos=manifests['2026'];
  if(!photos) return;
  const photoItems=photos.filter(function(p){return p.type==='photo';});
  // Pick 6 spread photos
  // Pick a good mix: landscape + normal portraits, avoid super-tall photos
  const indices=[0,7,4,12,8,17];
  
  CORK_POSITIONS.forEach(function(pos,i){
    var idx=indices[i];
    if(idx>=photoItems.length) idx=i;
    var photo=photoItems[idx];
    var style='width:'+pos.width+';padding:6px 6px 18px;transform:rotate('+pos.rotate+');';
    if(pos.top) style+='top:'+pos.top+';';
    if(pos.left) style+='left:'+pos.left+';';
    if(pos.right) style+='right:'+pos.right+';';
    if(pos.bottom) style+='bottom:'+pos.bottom+';';
    
    var html='<div class="cpol" style="'+style+'">'+
      '<div class="pin '+pos.pin+'" style="left:'+pos.pinLeft+'"></div>'+
      '<img src="photos/2026/'+photo.filename+'" style="width:100%;display:block;border-radius:1px" draggable="false">'+
      '<div class="cpol-cap"></div></div>';
    board.insertAdjacentHTML('beforeend',html);
  });
  
  // Make corkboard photos clickable
  document.querySelectorAll('.cpol').forEach(function(el){
    el.addEventListener('click',function(){
      var img=el.querySelector('img');
      if(img){
        var w=img.naturalWidth,h=img.naturalHeight;
        var o=w>h?'landscape':h>w?'portrait':'square';
        openModal(img.src,o);
      }
    });
  });
}

// ====== TIMELINE PHOTOS + ROTATION ======
function setupTimelinePhotos(){
  document.querySelectorAll('.ye').forEach(function(entry){
    var ynEl=entry.querySelector('.yn');
    if(!ynEl) return;
    var year=ynEl.textContent.trim();
    var photos=manifests[year];
    if(!photos) return;
    
    var photoItems=photos.filter(function(p){return p.type==='photo';});
    if(photoItems.length===0) return;
    
    // Pick 5 representative photos (hero + 4 thumbs)
    var pick=[];
    var step=Math.max(1,Math.floor(photoItems.length/5));
    for(var j=0;j<5&&j*step<photoItems.length;j++){
      pick.push(photoItems[j*step]);
    }
    while(pick.length<5&&photoItems.length>0){
      pick.push(photoItems[pick.length%photoItems.length]);
    }
    
    var hero=entry.querySelector('.yhi');
    if(!hero) return;
    
    var pcb=hero.querySelector('.pcb');
    var pcbText=pcb?pcb.textContent:'';
    hero.innerHTML='<span class="pcb">'+pcbText+'</span>';
    
    pick.forEach(function(p,i){
      var img=document.createElement('img');
      img.src='photos/'+year+'/'+p.filename;
      img.loading='lazy';
      if(i===0) img.className='active';
      hero.appendChild(img);
    });
    
    // Thumbnails
    var thumbEls=entry.querySelectorAll('.mt');
    for(var t=0;t<4&&t<pick.length-1;t++){
      if(thumbEls[t]){
        thumbEls[t].style.backgroundImage='url(photos/'+year+'/'+pick[t+1].filename+')';
      }
    }
    
    // Auto-rotate every 2 seconds
    var current=0;
    var imgs=hero.querySelectorAll('img');
    if(imgs.length>1){
      setInterval(function(){
        imgs[current].classList.remove('active');
        current=(current+1)%imgs.length;
        imgs[current].classList.add('active');
      },2000);
    }
  });
  
  // Make timeline hero photos clickable
  document.querySelectorAll('.yhi').forEach(function(h){
    h.style.cursor='pointer';
    h.addEventListener('click',function(e){
      var a=h.querySelector('img.active');
      if(a){e.stopPropagation();openModal(a.src,'landscape');}
    });
  });
}

// ====== MODAL ======
function openModal(src,orient){
  var fc=document.getElementById('flip-card');
  fc.className='flip-card fc-'+(orient||'landscape');
  var mi=document.getElementById('modal-img');
  mi.className='flip-front-img';
  mi.innerHTML='<img src="'+src+'">';
  document.getElementById('modal-cap').textContent='';
  document.getElementById('modal-back').textContent='(nothing written on the back yet)';
  document.getElementById('modal-date').textContent='';
  fc.classList.remove('flipped');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow='hidden';
}

function openFlipReal(el){
  if(el.getAttribute('data-type')==='video') return;
  var img=el.querySelector('img');
  if(!img) return;
  var orient=el.getAttribute('data-orient')||'landscape';
  var fc=document.getElementById('flip-card');
  fc.className='flip-card fc-'+orient;
  var mi=document.getElementById('modal-img');
  mi.className='flip-front-img';
  mi.innerHTML='<img src="'+img.src+'">';
  document.getElementById('modal-cap').textContent=el.querySelector('.sp-cap')?.textContent||'';
  // Try to get back text from data attribute
  var backText=el.getAttribute('data-back')||'(nothing written on the back yet)';
  var dateText=el.getAttribute('data-date')||'';
  document.getElementById('modal-back').textContent=backText;
  document.getElementById('modal-date').textContent=dateText;
  fc.classList.remove('flipped');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeModal(e){
  if(e.target===document.getElementById('modal')){
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow='';
  }
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){document.getElementById('modal').classList.remove('open');document.body.style.overflow='';}
});

// ====== NAV ======
function nav(id){
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0,behavior:'instant'});
  setTimeout(initObs,100);
}

function openYear(y){
  var yr=Y.find(function(d){return d.y===y;});
  if(yr&&yr.hasPhotos&&manifests[y]){
    buildScrapbookPage(y,yr);
    nav('sb-year');
  } else {
    // Generic placeholder page
    document.getElementById('sb-yr-num').textContent=y;
    document.getElementById('sb-yr-hl').textContent=yr?yr.h:y;
    document.getElementById('sb-yr-ds').textContent=yr?yr.s:'';
    document.getElementById('sb-yr-spread').innerHTML=
      '<div style="text-align:center;padding:5rem 2rem">'+
      '<p style="font-family:var(--fh);font-size:2rem;color:var(--ink4);opacity:.4;margin-bottom:1rem">📷</p>'+
      '<p style="font-family:var(--fh);font-size:1.4rem;color:var(--ink3);opacity:.45">Upload your photos to fill this scrapbook...</p>'+
      '<p style="font-family:var(--fb);font-size:.85rem;color:var(--ink4);margin-top:.5rem">Check out 2019 to see a filled scrapbook.</p></div>';
    nav('sb-year');
  }
}

// ====== BUILD SCRAPBOOK PAGE ======
function buildScrapbookPage(year,yrData){
  document.getElementById('sb-yr-num').textContent=year;
  document.getElementById('sb-yr-hl').textContent=yrData.sbHl||yrData.h;
  document.getElementById('sb-yr-ds').textContent=yrData.sbDs||yrData.s;
  
  var spread=document.getElementById('sb-yr-spread');
  spread.innerHTML='';
  
  var photos=manifests[year];
  if(!photos) return;
  
  var layout=SCRAPBOOK_LAYOUTS[year]||{};
  var rotations=layout.rotations||[];
  var wPortrait=layout.widths_portrait||[];
  var wLandscape=layout.widths_landscape||[];
  var tapePattern=layout.tapePattern||[];
  var tapeClasses=layout.tapeClasses||['wt-b','wt-s','wt-r','wt-y'];
  
  // Group by month
  var months={};
  var monthOrder=[];
  photos.forEach(function(p){
    var m=p.month||'misc';
    if(!months[m]){months[m]=[];monthOrder.push(m);}
    months[m].push(p);
  });
  
  var globalIdx=0;
  var tapeIdx=0;
  
  monthOrder.forEach(function(month){
    // Month divider
    spread.innerHTML+='<div class="sb-dv"><span class="sb-dv-t">'+month+'</span></div>';
    
    var rowHtml='<div class="sb-row">';
    months[month].forEach(function(item){
      var rot=rotations[globalIdx%rotations.length]||0;
      var isPortrait=item.orientation==='portrait';
      var w=isPortrait?(wPortrait[globalIdx%wPortrait.length]||260):(wLandscape[globalIdx%wLandscape.length]||380);
      var showTape=tapePattern[globalIdx%tapePattern.length];
      var tCls=tapeClasses[tapeIdx%tapeClasses.length];
      
      if(item.type==='video'){
        var videoUrl='https://drive.google.com/file/d/'+item.driveId+'/view';
        var thumbSrc=item.thumbnail?'photos/'+year+'/'+item.thumbnail:'';
        rowHtml+='<div class="sp sp-pol" style="width:'+w+'px;padding:6px 6px 28px;transform:rotate('+rot+'deg);position:relative" data-orient="landscape" data-type="video" data-video-url="'+videoUrl+'">';
        if(showTape){
          rowHtml+='<div class="wt '+tCls+'" style="width:'+Math.round(w*0.35)+'px;top:-9px;left:50%;position:absolute;transform:translateX(-50%) rotate(-0.6deg)"></div>';
          tapeIdx++;
        }
        if(thumbSrc){
          rowHtml+='<img src="'+thumbSrc+'" style="width:100%;display:block;border-radius:1px" draggable="false" loading="lazy">';
        } else {
          rowHtml+='<div style="background:var(--bg3);width:100%;aspect-ratio:'+(isPortrait?'3/4':'4/3')+';display:flex;align-items:center;justify-content:center;font-size:2rem">🎬</div>';
        }
        rowHtml+='<span class="sp-cap"></span><span class="vid-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg> play</span>';
        rowHtml+='</div>';
      } else {
        rowHtml+='<div class="sp sp-pol" style="width:'+w+'px;padding:6px 6px 28px;transform:rotate('+rot+'deg);position:relative" onclick="openFlipReal(this)" data-orient="'+item.orientation+'" data-back="'+(item.backText||'(nothing written on the back yet)').replace(/"/g,'&quot;')+'" data-date="'+formatDate(item.date)+'">';
        if(showTape){
          rowHtml+='<div class="wt '+tCls+'" style="width:'+Math.round(w*0.35)+'px;top:-9px;left:50%;position:absolute;transform:translateX(-50%) rotate(-0.4deg)"></div>';
          tapeIdx++;
        }
        rowHtml+='<img src="photos/'+year+'/'+item.filename+'" style="width:100%;display:block;border-radius:1px" draggable="false" loading="lazy">';
        rowHtml+='<span class="sp-cap">'+(item.caption||'')+'</span>';
        rowHtml+='</div>';
      }
      globalIdx++;
    });
    rowHtml+='</div>';
    spread.innerHTML+=rowHtml;
  });
  
  // Wire up video clicks
  spread.querySelectorAll('[data-type="video"]').forEach(function(el){
    el.style.cursor='pointer';
    el.addEventListener('click',function(e){
      e.stopPropagation();
      window.open(el.getAttribute('data-video-url'),'_blank');
    });
  });
}

// ====== SCROLL ANIMATIONS (exact v11) ======
function initObs(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var d=e.target.dataset.delay||0;
        setTimeout(function(){e.target.classList.add('v');},parseInt(d));
        obs.unobserve(e.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('[data-a]:not(.v)').forEach(function(el){obs.observe(el);});
  document.querySelectorAll('.fm:not(.v)').forEach(function(el){obs.observe(el);});
  document.querySelectorAll('[data-ay]:not(.v)').forEach(function(el){obs.observe(el);});
}

// Make family headshots clickable
document.querySelectorAll('.fpol').forEach(function(el){
  el.addEventListener('click',function(){
    var img=el.querySelector('img');
    if(img){
      var w=img.naturalWidth,h=img.naturalHeight;
      var o=w>h?'landscape':h>w?'portrait':'square';
      openModal(img.src,o);
    }
  });
});

// ====== HELPERS ======
function formatDate(d){
  if(!d||d.length<8) return '';
  var months=['','January','February','March','April','May','June','July','August','September','October','November','December'];
  var y=d.substring(0,4);
  var m=parseInt(d.substring(4,6));
  var day=parseInt(d.substring(6,8));
  return months[m]+' '+day+', '+y;
}
