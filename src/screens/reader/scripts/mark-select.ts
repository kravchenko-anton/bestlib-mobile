export const markSelectScript = `
	function wrapReactionsInMarkTag(reactions) {
		const instance = new Mark(document.querySelector('body'));
		instance.unmark();
		reactions.forEach(({ xpath, startOffset, id, endOffset, text }) => {
				const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					if (!element) return window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: '☠️ Element not found' }));
					if (!text || !endOffset) return window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: '☠️ Element not found' }));
					const containerText = slugify(element.textContent.slice(startOffset, endOffset));
					const textSlug = slugify(text);
					if (containerText !== textSlug) return window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', payload: '☠️ Text not equal container text' }));
						const instance = new Mark(element);
							instance.markRanges([
								{
									start: startOffset,
									length: endOffset - startOffset
								}
							], {
								element: 'mark',
								className: id
						})})
	}
			
		document.addEventListener('click', (event) => {
			const target = event.target;
			if (target.tagName === 'MARK') {
				const className = target.getAttribute('class');
				
				window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'mark-click', payload: {
					id:className
				} }));
			}
		});
		
`
