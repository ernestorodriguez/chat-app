import { expect } from 'chai';
import router  from '../../../../app/server';
import { Router } from 'express';

describe('Server', () => {
    it('must be a router', () => {
        expect(router.constructor).to.be.equals(Router.constructor);
    });
});
