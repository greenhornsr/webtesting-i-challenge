const {repair, succeed, fail} = require('./enhancer.js');

const item = {
    name: 'string',
    enhancement: 10,
    durability: 50
}

describe('enhancer.js', () => {
    it('should accept an item object', () => {
        expect(succeed(item)).toBeTruthy()
    });
    it('should accept an item object', () => {
        expect(fail(item)).toBeTruthy()
    });
    describe('repair()', () => {
        it('durability restored to 100', () => {
        expect(repair({durability: 89}).durability).toBe(100);
        expect(repair({durability: 100}).durability).toBe(100);
        expect(repair({durability: 0})).toEqual({durability: 100});
        // expect(repair).toThrow('a durability is required!');
        });
        it('should have a a range of 0 to 100 durability', () => {
            expect(repair({durability: -89})).toBe(false);
            expect(repair({durability: -1})).toBe(false);
            expect(repair({durability: 201})).toBe(false);
        })
        it('should verify it is a number', () => {
            expect(repair()).toBeDefined();
            expect(repair({durability: 'p'}).durability).not.toBeNull();
            expect(repair({durability: 'apple'}).durability).not.toBeNaN();
        })
    });
    describe('succeed()', () => { 
        it('should ensure durability of item remains unchanged', () => {
            expect(succeed({...item, durability: item.durability = 50}).durability).toBe(50)
        });
        it('should increase enhancement +1 if enhancement is less than 20', () => {
            expect(succeed({...item, enhancement: item.enhancement = 14}).enhancement).toBe(15)
            expect(succeed({...item, enhancement: item.enhancement = 8}).enhancement).toBe(9)
        });
        it('should check if enhancement is equal to 20, no change', () => {
            expect(succeed({...item, enhancement: item.enhancement = 20}).enhancement).toBe(20)
        });
        it('should ensure the number is between 0 and 20', () => {
            expect(succeed({...item, enhancement: item.enhancement = -1}).enhancement).toBeFalsy()
            expect(succeed({...item, enhancement: item.enhancement = 21}).enhancement).toBeFalsy()
        }); 
    }); 
    describe.only('fail()', () => {
        it('should reduce item durability by 5 if enhancement is less than 15', () => {
            expect(fail({...item, enhancement: item.enhancement = 14, durability: item.durability = 10}).durability).toBe(5)
            expect(fail({...item, enhancement: item.enhancement = 10, durability: item.durability = 5}).durability).toBe(0)
            expect(fail({...item, enhancement: item.enhancement = 3, durability: item.durability = 3}).durability).toBe(0)
        });
        it('should reduce item durability by 10 if enhancement is 15 or more', () => {
            expect(fail({...item, enhancement: item.enhancement = 15, durability: item.durability = 10}).durability).toBe(0)
            expect(fail({...item, enhancement: item.enhancement = 18, durability: item.durability = 16}).durability).toBe(6)
            expect(fail({...item, enhancement: item.enhancement = 18, durability: item.durability = 2}).durability).toBe(0)
            expect(fail({...item, enhancement: item.enhancement = 18, durability: item.durability = 8}).durability).toBe(0)
        });
        it('should reduce item enhancement by 1 if enhancement is 16 or more', () => {
            expect(fail({...item, enhancement: item.enhancement = 16}).enhancement).toBe(15)
            expect(fail({...item, enhancement: item.enhancement = 18}).enhancement).toBe(17)
            expect(fail({...item, enhancement: item.enhancement = 15}).enhancement).toBe(15)

        });
        // it.todo('accepts item object');
        // it.todo('should return a new item'); 
    });
});