import { expect } from 'chai';
import { render } from '../../../../../app/pages/demo/controller';

describe('demo Page controller', () => {
   it('mus call send with correct params', (done) => {
       render({},{
           send(response) {
               expect(response).to.be.an('string');
               done();
           }
       })
   })
});