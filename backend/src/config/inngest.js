 import { Inngest } from 'inngest';
 import {conectDB} from './db.js';
 import {User} from '../models/user.model.js';

 export const inngest = new Inngest({ name: 'E-Commerce APP' });

 const syncUser = inngest.createFunction(
    {id:'sync/user'},
    {event:'clerk/user.created'},
    async ({event}) =>{
        await conectDB();
        const {id , email_addresses, first_name, last_name, image_url} = event.data;

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}` || "User",
            imageURL: image_url,
            adrresses: [],
            wishlist: [],
        };

        await User.create(newUser);
    }
);

export const funtions = [syncUser , deleteUserFromDB];