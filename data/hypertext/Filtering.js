HyperText("Filtering",function(){return `
<h3>Filtering</h3>
<p>Filter the ${v.TITLE_BOLD()} by keywords such as <b>name</b>, <b>author</b> and <b>date added</b>. Just type a keyword in the search field atop the table. Keywords are space- and case-insensitive.</p>
<p>To save and link to a specific filtered view of the table, ensure this page's URL ends with <code>${PageUnSearch()}?search=<b>keyword</b></code>.</p>
<p>All saved filtered views update whenever the ${v.TITLE_BOLD()} updates.</p>
`})