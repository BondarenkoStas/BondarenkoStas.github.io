var pow = function(number, exponent) {	
	var number = Number(parseFloat(number));
	var exponent = Number(parseFloat(exponent));

	if(isNaN(number) && isNaN(exponent))
		return 'wrong data';
	else if (isNaN(number) && !(isNaN(exponent)))
		return 'wrong number';
	else if(!(isNaN(number)) && isNaN(exponent))
		return 'wrong exponent';
	else if(!(number || exponent))
		return 'number and exponent both equal 0';

	var res = 1;
	if (exponent < 0)
		for(var i = exponent; i < 0; i++, res/=number);
	for(var i = 1; i <= exponent; i++, res*=number);
	return +res.toFixed(16);
}
try {
	module.exports = pow;
} catch (e) {}