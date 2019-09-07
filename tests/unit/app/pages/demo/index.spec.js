import { expect } from 'chai';
import router  from '../../../../../app/pages/demo';
import { Router } from 'express';

describe('demo Page index', () => {
    it('must be a router', () => {
        expect(router.constructor).to.be.equals(Router.constructor);
    });
});
