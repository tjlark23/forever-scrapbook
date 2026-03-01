// ====== YEAR DATA (exact match from v11) ======
const Y=[
{y:'2013',h:'Where it all started',s:'Two people who had no idea what they were getting into decided to do life together anyway. Best decision ever made.',n:'"I still can\'t believe she said yes."',ct:12,c:'y13'},
{y:'2014',h:'Year one',s:'First apartment, first road trips as married, and learning to share a bathroom without war.',n:'Everything was new and everything was good.',ct:18,c:'y14'},
{y:'2015',h:'Building',s:'Building a life, a home, the kind of foundation you don\'t realize you\'re building until later.',n:'The calm before the beautiful storm.',ct:15,c:'y15'},
{y:'2016',h:'Noelle arrives ✶',s:'Our firstborn showed up and immediately started running the place. She hasn\'t stopped since.',n:'The moment everything changed.',ct:42,c:'y16'},
{y:'2017',h:'Learning the ropes',s:'First words, first steps, first time realizing you\'d do anything for this tiny human who refuses to sleep.',n:'"Nobody tells you about the love."',ct:35,c:'y17'},
{y:'2018',h:'Finding our rhythm',s:'Toddler life, date nights between naps, and realizing this chaotic new normal was actually pretty great.',n:'We stopped surviving and started thriving.',ct:28,c:'y18'},
{y:'2019',h:'Charlie joins the crew',s:'Now outnumbered — a boy full of energy, opinions, and an impressive set of lungs.',n:'"His first word was \'no.\'"',ct:24,c:'y19',hasPhotos:true,
  sbHl:'Charlie joins the crew',sbDs:'The year we went from man-to-man defense to zone coverage. Charlie arrived with volume, opinions, and zero respect for sleep schedules.'},
{y:'2020',h:'The year the world stopped',s:'Everything shut down. Inside: pancake breakfasts, backyard adventures, more family time than we ever expected.',n:'Silver linings in sweatpants.',ct:24,c:'y20'},
{y:'2021',h:'Texas roots planted',s:'Liberty Hill — where the sky is big, the neighbors wave, and the kids have room to be wild.',n:'Home is wherever these four are.',ct:30,c:'y21'},
{y:'2022',h:'Settling in',s:'New schools, new neighbors, new favorite taco spots. Liberty Hill started feeling like home.',n:'Kids made friends faster than we unpacked.',ct:33,c:'y22'},
{y:'2023',h:'The great road trip',s:'Too many snacks, not enough chargers, just enough patience. Memories we\'ll never forget.',n:'"Are we there yet?" — Charlie, 47 times',ct:45,c:'y23'},
{y:'2024',h:'Growing up',s:'Noelle reads books thicker than TJ\'s. Charlie negotiated hard on the Tooth Fairy rate.',n:'"Not little anymore. But still ours."',ct:58,c:'y24'},
{y:'2025',h:'Growing & thriving',s:'Another incredible year of sports, school, and family adventures. The kids are growing faster than we can keep up with.',n:'Every year gets better somehow.',ct:171,c:'y25',hasPhotos:true,
  sbHl:'Growing & thriving',sbDs:'Sports, school, adventures, and watching these kids become the coolest little humans we know.'},
{y:'2026',h:'Right about now',s:'Noelle is 9 going on 30. Charlie is 6 going on 600mph. Sports, learning, chess, art, and so much love.',n:'The best chapter is the one you\'re in.',ct:22,c:'y25',hasPhotos:true,
  sbHl:'Right about now',sbDs:'Noelle is 9 going on 30. Charlie is 6 going on 600mph. We\u2019re just trying to keep up and soak in every moment.'}
];

const TC=['ph1','ph2','ph3','ph4','ph5','ph6','ph7'];

// Corkboard photo positions (exact from v11)
const CORK_POSITIONS = [
  {top:'2%',left:'1%',width:'38%',rotate:'-5deg',pin:'pin-r',pinLeft:'30%'},
  {top:'1%',left:'40%',width:'32%',rotate:'3deg',pin:'pin-b',pinLeft:'50%'},
  {top:'5%',right:'1%',width:'30%',rotate:'-2deg',pin:'pin-g',pinLeft:'40%'},
  {top:'46%',left:'0%',width:'30%',rotate:'5deg',pin:'pin-y',pinLeft:'60%'},
  {top:'42%',right:'3%',width:'33%',rotate:'-3.5deg',pin:'pin-r',pinLeft:'35%'},
  {bottom:'2%',left:'28%',width:'36%',rotate:'-1.5deg',pin:'pin-g',pinLeft:'50%'}
];

// Scrapbook layout configs per year
const SCRAPBOOK_LAYOUTS = {
  '2019': {
    rotations: [3, 3.5, 1.5, 1, -2.5, 2, -1.5, 3, -2, 1.5, -3, 2.5, -1, 3, -2, 1.5, -3, 2, -1.5, 3, -2, 2.5, -1.5, 3],
    widths_portrait: [280, 320, 240, 260, 300, 240, 280, 260, 240, 280, 260, 300, 240, 280, 260, 240, 300, 280, 260, 240, 280, 300, 260, 280],
    widths_landscape: [400, 360, 380, 340, 400, 360, 380, 340, 400, 360, 380, 340, 400, 360, 380, 340, 400, 360, 380, 340, 400, 360, 380, 340],
    tapePattern: [false,false,true,false,false,true,false,false,false,true,false,false,true,false,false,false,true,false,false,true,false,false,false,true],
    tapeClasses: ['wt-b','wt-s','wt-r','wt-y','wt-b','wt-s','wt-r','wt-y','wt-b','wt-s','wt-r','wt-y']
  },
  '2025': {"rotations": [0.4, 1.0, -0.2, -2.3, -3.5, 3.3, 0.5, -3.0, -0.7, -3.2, 1.9, 3.4, -2.8, -3.2, -3.3, 0.1, 2.0, -2.1, -2.2, 1.5, 3.4, 3.1, 1.0, 2.9, -1.0, 2.9, 0.7, 0.3, -2.0, -1.8, -3.3, 2.0, 0.4, -0.9, 3.4, -0.3, -1.6, 2.2, 0.5, 2.3, -1.2, -0.4, 2.1, -0.3, 1.3, 1.8, 0.4, 1.1, 0.6, 1.8, 2.5, 2.4, -1.1, 0.3, 0.7, -2.4, -1.5, -1.2, -1.0, 0.4, 1.2, -1.6, -1.6, 1.0, -2.5, -1.0, 1.6, 0.9, 2.2, 0.3, 0.5, 0.0, -0.8, -1.1, -1.8, 0.6, 0.0, 0.5, 1.3, -2.1, -2.1, -2.5, -0.4, 0.5, 1.9, -1.7, -3.4, 0.6, -2.1, -2.5, -2.3, 1.3, 1.6, -1.7, 2.9, -2.5, 0.9, 1.7, -2.4, 3.1, -1.9, 1.8, 2.0, -3.0, 0.1, -1.8, -0.6, 2.1, 2.1, 1.2, 0.6, -1.9, 2.7, -1.0, 1.5, 0.1, -0.9, -0.2, -1.7, -3.0, 3.0, -1.3, 0.1, 0.8, 0.8, -0.6, -1.2, 2.0, 3.2, 3.2, 2.8, -2.4, 2.5, -1.2, 1.7, -0.0, -2.2, 0.1, -3.0, -2.2, -1.0, 2.1, -3.1, 2.3, 3.0, -2.6, 1.3, 0.7, -1.1, -1.4, 1.2, 0.8, -2.2, -3.1, -0.7, 0.6, 1.5, -1.5, -1.6, -1.3, 2.8, -0.3, 2.8, 3.5, -3.1, -3.3, 0.2, 2.2, 1.5, -0.2, -2.5, 2.7, 0.9, 2.3, 2.3], "widths_portrait": [300, 280, 300, 240, 240, 280, 240, 240, 320, 300, 300, 320, 280, 240, 280, 240, 280, 280, 320, 240, 260, 320, 300, 280, 240, 280, 280, 280, 240, 300, 240, 320, 280, 280, 280, 240, 240, 240, 280, 280, 300, 240, 260, 280, 320, 280, 320, 280, 260, 260, 260, 320, 260, 280, 240, 300, 300, 300, 260, 260, 260, 320, 240, 300, 280, 260, 240, 280, 280, 260, 240, 300, 320, 320, 260, 300, 260, 260, 240, 320, 240, 280, 300, 280, 300, 240, 240, 280, 260, 240, 260, 280, 260, 280, 280, 240, 260, 240, 260, 240, 260, 260, 260, 300, 320, 320, 260, 240, 320, 240, 260, 320, 260, 240, 240, 280, 260, 280, 260, 280, 320, 300, 300, 260, 260, 280, 320, 260, 320, 260, 280, 320, 260, 280, 280, 260, 320, 300, 280, 300, 240, 260, 260, 240, 260, 240, 280, 280, 260, 320, 320, 260, 300, 320, 300, 300, 320, 240, 300, 280, 300, 260, 240, 280, 260, 240, 320, 280, 240, 320, 240, 240, 280, 240, 280], "widths_landscape": [380, 380, 360, 340, 400, 340, 360, 340, 380, 360, 380, 380, 380, 360, 340, 340, 400, 360, 340, 380, 340, 360, 360, 380, 360, 400, 360, 400, 400, 340, 380, 360, 360, 360, 340, 400, 340, 360, 380, 360, 340, 340, 400, 400, 400, 400, 360, 380, 380, 360, 380, 380, 340, 340, 380, 380, 360, 400, 400, 380, 360, 360, 400, 360, 360, 360, 380, 340, 380, 380, 340, 360, 380, 400, 360, 340, 380, 340, 380, 380, 380, 380, 400, 340, 400, 360, 400, 380, 400, 340, 360, 400, 380, 340, 380, 400, 380, 360, 380, 400, 360, 380, 340, 400, 340, 400, 360, 340, 400, 380, 400, 400, 400, 400, 360, 340, 380, 360, 340, 340, 400, 340, 340, 360, 340, 380, 380, 400, 400, 340, 380, 400, 360, 400, 360, 360, 400, 380, 360, 400, 400, 340, 400, 360, 380, 400, 400, 380, 360, 360, 400, 380, 400, 360, 400, 400, 340, 400, 360, 340, 400, 360, 400, 400, 340, 360, 340, 340, 340, 380, 380, 340, 360, 380, 360], "tapePattern": [false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false], "tapeClasses": ["wt-b", "wt-s", "wt-r", "wt-y", "wt-b", "wt-s", "wt-r", "wt-y", "wt-b", "wt-s", "wt-r", "wt-y", "wt-b", "wt-s", "wt-r", "wt-y"]},
  '2026': {
    rotations: [3, 3.5, 2, -3, -1.5, 2.5, -2, 1.5, 3, -2.5, 1, -3, 2, -1.5, 3, -2, 2.5, -1, 3, -2.5, 1.5, -3],
    widths_portrait: [240, 280, 260, 300, 240, 280, 260, 240, 300, 280, 260, 240, 280, 300, 260, 240, 280, 260, 300, 240, 280, 260],
    widths_landscape: [400, 360, 380, 340, 400, 360, 380, 340, 400, 360, 380, 340, 400, 360, 380, 340, 400, 360, 380, 340, 400, 360],
    tapePattern: [false,false,true,false,true,false,false,true,false,false,true,false,false,true,false,false,true,false,false,true,false,false],
    tapeClasses: ['wt-s','wt-b','wt-r','wt-y','wt-s','wt-b','wt-r','wt-y','wt-s','wt-b','wt-r','wt-y']
  }
};
