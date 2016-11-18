var pow = require('../js/script.js');

describe('tests for pow(number,exponent)', function() {
	describe('check correct data',function(){
		it('number on exponent or both is text', function() {
			expect(pow('2',2)).toBe(4);
			expect(pow(2,'2')).toBe(4);
			expect(pow('2','2')).toBe(4);
		});
		it('number or exponent or both is not a number and cannot be parse in number',function(){
			expect(pow('a',3)).toContain('wrong number');
			expect(pow(1,'a')).toContain('wrong exponent');
			expect(pow('a','a')).toContain('wrong data');
			expect(pow(undefined,[])).toContain('wrong data');
		});
		it('if number and exponent both equal 0',function(){
			expect(pow(0,0)).toContain('number and exponent both equal 0');
		});
	});
	it('check if exponent equal 0', function() {
		expect(pow(3,0)).toBe(1);
		expect(pow(-3,0)).toBe(1);
	});
	it('check on fractional number', function() {
		expect(pow(0.3,2)).toBe(0.09);
		expect(pow(0.4,3)).toBe(0.064);
	});
	it('check on fractional exponent',function(){
		expect(pow(2,2.2)).toBe(4);
		expect(pow(4,2.2)).toBe(16);
	});
	it('check negative number', function() {
		expect(pow(-2,2)).toBe(4);
		expect(pow(-2,3)).toBe(-8);
	});
	it('check negative exponent',function(){
		expect(pow(2,-2)).toBe(0.25);		
	});
	it('check number equal 0', function() {
		expect(pow(0,3)).toBe(0);
	});
	it('check number equal 1', function() {
		expect(pow(1,3)).toBe(1);
	});
});