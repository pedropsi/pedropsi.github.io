function SkiParenthise(expression){
	var letters=expression.split("");
	return "(".repeat(letters.length-2)+First(letters)+"("+Rest(letters).join("))(")+")"
}

var SKIRules={
	"(I(A))":"A",
	"((K(A))(B))":"A",
	"(((S(A))(B))(C))":"(A(C))(B(C))",
}

function SKIBalanced(expression){
	return expression.replace(/[^/(]/g,"").length===expression.replace(/[^/)]/g,"").length;
}