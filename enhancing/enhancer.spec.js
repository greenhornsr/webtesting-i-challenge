const {repair} = require('./enhancer.js');

describe('enhancer.js', () => {
    describe('repair()', () => {
        it('durability restored to 100', () => {
        expect(repair({durability: 'p'}).durability).not.toBeNull();
        expect(repair({durability: 'apple'}).durability).not.toBeNaN();
        expect(repair({durability: 89}).durability).toBe(100);
        expect(repair({durability: -89}).durability).toBe(100);
        expect(repair({durability: 100}).durability).toBe(100);
        expect(repair({durability: 0})).toEqual({durability: 100});
        expect(repair).toThrow('a durability is required!');
        });
        it('should have a a range of 0 to 100 durability', () => {
            expect(repair({durability: -1}).durability).toBeGreaterThanOrEqual(0);
            expect(repair({durability: 101}).durability).toBeLessThanOrEqual(100);
        })
    });
});