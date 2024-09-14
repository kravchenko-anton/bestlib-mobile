export const calculateProgress = `
	 let currentScrollPosition = document.body.scrollTop;
	 let chapters = document.querySelectorAll('section');
	 chapters = Array.from(chapters).filter(chapter => chapter.id);
			 let currentChapterProgress = 0;
			 let currentChapter = 0;
			  let currentChapterLink = '';
			  let currentChapterTitle = '';
			  chapters.forEach((chapter, index) => {
         const chapterStart = chapter.offsetTop - 1;
         const chapterEnd = chapterStart + chapter.clientHeight;
         const chapterProgress = (currentScrollPosition - chapterStart) / (chapterEnd - chapterStart) * 100;
         const chapterTitle = chapter.getAttribute('data-title');
         if (chapterProgress >= 0 && chapterProgress <= 100) {
          currentChapterProgress = chapterProgress;
          currentChapterTitle = chapterTitle;
          currentChapter = index;
          currentChapterLink = chapter.id;
         }
        });
	
   window.ReactNativeWebView.postMessage(JSON.stringify({
     type: "scroll",
     payload: {
       scrollTop: currentScrollPosition,
       progress: (currentScrollPosition / (document.body.scrollHeight - document.body.clientHeight) * 100),
       chapter: {
        chapterLink: chapters[currentChapter].id,
        chapterProgress: currentChapterProgress,
        chapterTitle: currentChapterTitle
       }
     }
   }));
`
export const scrollCalculateProgress = `
let timerId;

  
window.addEventListener('scroll', function() {
 clearTimeout(timerId);

 timerId = setTimeout(() => {
  ${calculateProgress}
 }, 700);
});
`
