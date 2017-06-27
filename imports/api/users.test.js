import expect from 'expect';
import {validateNewUser} from './users.js';
import {Meteor} from 'meteor/meteor';

if (Meteor.isServer) {
  describe('users',function() {
    it('It Should allow valid e-mail address',function () {
      const testUser = {emails:[
        {
          address: 'leo@hujs.com'
        }
      ]};
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });
    testUser = {
      emails:[{address:'lolee'}]
    };
    it('it should not accept invalid e-mails',function() {
      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });
  });

}












// const add = (a,b) => {
//   if (typeof b !== 'number') {
//     return a+a;
//   }
//   return a+b;
// };
//
// const square = (a) => a*a;
//
// ////////////////
//
// describe('This is the add section',function () {
//
//   it('should add two numbers',function(){
//     const res = add(11,9);
//     expect(res).toBe(20);
//   });
//
//   it('should double a single number',function(){
//     const res = add(44);
//     expect(res).toBe(88);
//   });
//
// });
//
// describe('Square section',function () {
//
//   it('shoul square a number', function () {
//     const res= square(9);
//     expect(res).toBe(81);
//   });
// });
