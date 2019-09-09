import { expect } from 'chai';
import User from '../../../../lib/chat/User';
import ChatRoom from '../../../../lib/chat/ChatRoom';
import ChatView from '../../../../lib/chat/ChatView';




describe('ChatView', () => {
    describe('must set valid message for las time connected', () => {
        const getView = (lastTimeConnected) => {
            const laura = new User({
                id: 'laura',
                name: 'Laura Rodriguez',
                lastTimeConnected: lastTimeConnected,
                avatar: 'https://placeimg.com/100/100/tech'
            });

            const chatRoom = new ChatRoom({
                from: laura,
                users: [
                    laura,
                ]
            });

            return new ChatView(chatRoom);
        };

        it('description must be "Active in the last minute" if time less than a minute ', () => {
            const lastTimeConnected = Date.now() - 4000;
            const view = getView(lastTimeConnected);

            expect(view.render().header.subtitle).to.be.deep.equals('Active in the last minute');
        });

        it('description must be "Active in the last minute" if time is a minute ', () => {
            const lastTimeConnected = Date.now() - 60000;
            const view = getView(lastTimeConnected);

            expect(view.render().header.subtitle).to.be.deep.equals('Active in the last minute');
        });

        it('description must be "Active in the last 30 Minutes" if time 30m ', () => {
            const lastTimeConnected = Date.now() - 60000 * 30;
            const view = getView(lastTimeConnected);

            expect(view.render().header.subtitle).to.be.deep.equals('Active in the last 30 Minutes');
        });

        it('description must be "Active in the last 60 Minutes" if time is an 1h ', () => {
            const lastTimeConnected = Date.now() - 60000 * 60;
            const view = getView(lastTimeConnected);

            expect(view.render().header.subtitle).to.be.deep.equals('Active in the last 60 Minutes');
        });

        it('description must be "Active in the last 2 Hours" if time more 1h  ', () => {
            const lastTimeConnected = Date.now() - 60000 * 60 * 2;
            const view = getView(lastTimeConnected);

            expect(view.render().header.subtitle).to.be.deep.equals('Active in the last 2 Hours');
        });

        it('description must be "Active in the last 24 Hours" if time more 1h  ', () => {
            const lastTimeConnected = Date.now() - 60000 * 60 * 24;
            const view = getView(lastTimeConnected);

            expect(view.render().header.subtitle).to.be.deep.equals('Active in the last 24 Hours');
        });

        it('description must be "Active in the last 2 Days" if time more 1h  ', () => {
            const lastTimeConnected = Date.now() - 60000 * 60 * 64;
            const view = getView(lastTimeConnected);

            expect(view.render().header.subtitle).to.be.deep.equals('Active in the last 2 Days');
        });
    });
});
