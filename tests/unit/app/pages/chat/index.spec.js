import { expect } from 'chai';
import router  from '../../../../../app/pages/chat';
import { Router } from 'express';

describe('Chat Page index', () => {
    it('must be a router', () => {
        expect(router.constructor).to.be.equals(Router.constructor);
    });
});
