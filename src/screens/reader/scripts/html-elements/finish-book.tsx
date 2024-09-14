import { Color } from '@/utils/colors'

export const finishBookButton = `
		<div
		  class="finish-book-button-container"
		 style="
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				left: 0;
				right: 0;
				height: 70px;
				font-weight: bold;
				margin-top: 40px;
				padding-bottom: 10px;
		
				">
				<div
					class="finish-book-text">Read it till the end?<div
				class="finish-book-button"
				onclick="window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finishBook' }))"
				style="
				border: 0;
				color: ${Color.white};
				font-size: 16px;
				border-radius: 6px;
				padding: 6px 19px;
				"
				>
				Finish book
				</div>
</div>

</div>

`
