HyperText("LevelSelectorPick",function(){
	return `
		<h4>Picking levels in the selector menu</h4>
		<h5>Directly</h5>
		<p>${KB("click")} the level name.</p>

		<h5>Type the level name</h5>
		<p>Start typing the level name and the cursor will move to the correct level. Press ${KB("enter")} to confirm.</p>

		<h5>Type the level number</h5>
		<p>Alternatively, you may type the level number with ${v.NUM_KEYS()}. Press ${KB("enter")} to confirm.</p>

		<h5>Arrow keys to move</h5>
		<p> Press ${KB("left")} or ${KB("right")} to move between levels. You may also use ${KB("tab")} or ${KB("shift tab")}. Press ${KB("enter")} to confirm.</p>

		<h4>Closing the selector menu</h4>
		<p>Pressing ${KB("esc")} or ${v.LEVEL_KEY()} will close the menu without changing level.</p>
	`;
})
