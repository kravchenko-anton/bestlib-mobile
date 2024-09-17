import { calculateProgress } from "./calculate-progress";
//language=TypeScript
export const utilsScripts = `
function getCharactersCountUntilNode(node, parent) {
  var walker = document.createTreeWalker(
    parent || document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  var found = false;
  var chars = 0;
  while (walker.nextNode()) {
    if(walker.currentNode === node) {
      found = true;
      break;
    }
    chars += walker.currentNode.textContent.length;
  }
  if(found) {
    return chars;
  }
  else return -1;
}


	const slugify = (textContent) => textContent.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
	
	function scrollToChapter(link) {
	document.getElementById(link)?.scrollIntoView({ behavior: 'smooth' })
}

function removeAllTextSelection() {
	window.getSelection().removeAllRanges();
}


	function scrollToProgress(progress) {
		const scrollHeight = document.documentElement.scrollHeight;
		const scrollTop = scrollHeight * progress;
		window.scrollTo({
			top: scrollTop
		})
		${calculateProgress}
	}
	  const getXPath = (element) => {
        if (element.id !== '') return 'id("' + element.id + '")';
        if (element === document.body) return element.tagName;

        let ix = 0;
        let siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            let sibling = siblings[i];
            if (sibling === element) return getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
        }
    }
	

   window.onerror = function(message, sourcefile, lineno, colno, error) {
      alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
      return true;
    };
`;
