import { expect } from 'chai';
import router  from '../../../api';
import { Router } from 'express';

describe('Api', () => {
    it('must be a router', () => {
        expect(router.constructor).to.be.equals(Router.constructor)
    })
});