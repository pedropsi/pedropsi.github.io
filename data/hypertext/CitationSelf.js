HyperText("CitationSelf",function(){return `
	<p class="reference">
		${v.TITLE_BY_AL()}, accessed ${DateString(false,"Super")}, ${SelfAHTML()}
	</p>
`})

function SelfAHTML(){
	return `<a href="${v.SITE()}/${v.LINK()}">
				${v.SITE()}/${v.LINK()}
			</a>`;
}


