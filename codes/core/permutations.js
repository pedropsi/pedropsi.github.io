//Factorial numbers and arrays
Factorial=function(n){
	if(n<=1)
		return 1;
	if(Factorial[n])
		return Factorial[n];
	else
		return Factorial[n]=n*Factorial(n-1);
}