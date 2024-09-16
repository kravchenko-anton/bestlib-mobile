import { reactions } from "@/utils/reactions";

export const selectMenuHtml = `
<div id="select-menu" style="display: none; pointer-events: none; visibility: hidden; opacity: 0; position: absolute; left: 10px; top: 10px;  transition: all 0.3s ease-in-out;">
<div class="select-menu-reaction" id="select-menu-reaction">
	${reactions.map((reaction) => `<img src="${reaction.gif}" alt="${reaction.alt}" title="${reaction.title}" width="28" height="28" class="select-menu-reaction-item">`).join("")}
</div>
<div class="select-default-menu">
<div class="select-default-menu-item" 	id="text-menu-translate">
<svg   xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
	<p>Translate</p>
</div>
<div class="select-default-menu-item" 	id="text-menu-share">
<svg  xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
	<p>Share</p>
</div>

<div class="select-default-menu-item" 	id="text-menu-explain">
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
	<p>Explain </p>
</div>
<div class="select-default-menu-item" 	id="text-menu-problem">
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
	<p>Problem</p>
</div>


</div>
</div>
`;
