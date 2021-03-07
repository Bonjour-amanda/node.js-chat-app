# node.js-chat-app

To run the API:

steps : 1. type "npm run dev" in terminal
        2. open postman and login, and then run it in localhost:3000

1. User can send a message to another user.

steps : 
    1. user need to sign-up or sign-in (using localhost:3000/user/signup or localhost:3000/user/signin) 
    2. user can send a message (using localhost:3000/message/sendMessage/:id (another user id)). 
     

2. User can list all messages in a conversation between them and another user.

steps : 
    1. user need to sign-up or sign-in (using localhost:3000/user/signup or localhost:3000/user/signin)
    2. user can see all their conversation (using localhost:3000/message/showmessage)
        or if they want to see a specific message 
        (it can be use this => localhost:3000/message/getone_message/:id (put the message id))

3. User can reply to a conversation they are involved with.

steps : 
    1. user need to sign-up or sign-in (using localhost:3000/user/signup or localhost:3000/user/signin) 
    2. user can send a message (using localhost:3000/message/sendMessage/:id (put the user id that they want to reply )).
        for example, user id 1 want reply a message to user id 2, so user id 1 need to login first and then puth user id 2 in the params, like this localhost:3000/message/sendMessage/2

4. User can list all their conversations (if user A has been chatting with user C & D, the list for A will shows A-C & A-D)

steps : 
    1. user need to sign-up or sign-in (using localhost:3000/user/signup or localhost:3000/user/signin) 
    2. user id 1 can see the message that they send to user id 2, 3, 4,......,1000 and
         also user id 1 can see message that they receive from user id 2, 3, 4, ......, 1000 
         (using localhost:3000/message/showmessage)