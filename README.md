# DOLLS COLLECTOR APP - Backend

## Description

Webapp that helps to organize your doll collection.

## User Stories / MVP

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup

**Sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Doll / Catalog:**
- As a user I want to see the dolls catalog
- As a user I want to see the doll's details

**User profile:**

- As a user I want to see my profile
- As a user I want to update my profile

**My Doll / My Collection / My Wishlist:**
- As a user I want to see my dolls collection / wishlist
- As a user I want to add the doll to my dolls collection / wishlist
- As a user I want to delete the doll from my dolls collection / wishlist
- As a user I want to update my doll info
- As a user I want to see the sum I paid for my dolls and the difference between this sum and release prices sum

## Backlog

List of other features outside of the MVPs scope:

**Doll / Catalog:**
- As a user I want to filter dolls by parameters
- As a user I want to search a doll
- As a user I want to see the doll's current price (from Ebay API) and the difference between release and current prices

**User profile:**
- As a user I want to see another user profiles, collections, wishlists and selling lists
- As a user I want to contact to another user 

**My Doll / My Collection / My Wishlist:**
- As a user I want to see the sum of currect prices of my collection (from Ebay API) and the difference between this sum and the amount I paid for my dolls 
- As a user I want to add OOAK (One Of A Kind) dolls to my collection
- As a user I want to upload photos of my dolls
- As a user I want to have both private and public wishlists
- As a user I want to have alerts about Ebay listing of the dolls from my wishlist at several price
- As a user I want to have my selling list (public)



## Routes (MVP) / API endpoints

| Type/Model | Name | Method | Endpoint | Description | Body | Redirects |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| Auth | Me | GET | /me | Check session status | - |  |
| Auth | Sign Up | POST | /signup | Sign up a user | {email, password} | /catalog  | 
| Auth | Log In | POST | /login | Log in a user | {email, password} | /catalog | 
| Auth | Log out | GET | /logout | Log out a user | - |  | 
|  | Home | GET | / | Show home page | - |  | 
| Doll | Catalog | Get | /catalog | User sees the catalog | - |  | 
| Doll | Doll Details | GET | /catalog/:dollID | User sees the doll details | - |  | 
| User | Profile | GET | /profile | User sees his/her profile | - |  | 
| User | Profile | PUT | /profile | User updates his/her profile | {username} | /profile |
| MyDoll | My collection | GET | /mycollection | User sees his/her collection | - |  | 
| MyDoll | Add doll to collection | POST | /mycollection | User adds the doll to his/her collection | {dollID} | /mycollection/:MyDollID |
| MyDoll | Update doll info | PUT | /mycollection/:MyDollID | User updates his/her doll info | {purchaseDate, purchasePrice, purchaseWay, state, complete} | /mycollection/:MyDollID |
| MyDoll | Delete from collection | DELETE | /mycollection/:MyDollID | User deletes the doll from collection | - |  | 
| MyDoll | My wishlist | GET | /mywishlist | User sees his/her wishlist | - |  | 
| MyDoll | Add doll to collection | POST | /mycollection | User adds the doll to his/her wishlist | {dollID} | /mywishlist/:MyDollID |
| MyDoll | Update doll info | PUT | /mywishlist/:MyDollID | User updates his/her doll info | {state, complete} | /mywishlist/:MyDollID |
| MyDoll | Delete from wishlist | DELETE | /mywishlist/:MyDollID | User deletes the doll from wishlist | - |  |  


## Models

**_User Model_**

```javascript
 {
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    username: { type: String, unique: true },
    collection: [{ type: Schema.Types.ObjectID, ref: 'MyDoll' }],
    wishlist: [{ type: Schema.Types.ObjectID, ref: 'MyDoll' }],
    tosell: [{ type: Schema.Types.ObjectID, ref: 'MyDoll' }],     // Backlog
},
{
    timestamps: true,
}

```

**_MyDoll Model_**

```javascript
{
    owner: { type: Schema.Types.ObjectID, ref: 'User' },
    doll: { type: Schema.Types.ObjectID, ref: 'Doll' },
    purchaseDate: { type: Date },
    purchasePrice: { type: Number },
    purchaseWay: { type: String },
    state: { type: String, default: 'Perfect' },
    complete: { type: Boolean, default: true },
    nudeDoll: { type: Boolean, default: false},
    headOnly: { type: Boolean, default: false },
    outfitOnly: { type: Boolean, default: false },
    partialOutfit: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
```

**_Doll Model_**

```javascript
  {
    subBrand: { type: String },
    name: { type: String },
    character: { type: String },
    mold: { type: String },
    body: { type: String },
    skinTone: { type: String },
    hair: { type: String },
    img: [{ type: String }],
    collectionName: { type: String },
    distributedBy: { type: String },
    year: { type: Number },
    editionSize: { type: Number },
    releasePrice: { type: Number },
    currentPrice: { type: Number },   // Backlog, depends on Ebay API
  },
  {
    timestamps: true,
  }
```


## Git

[Repository Link](https://github.com/Olga1305/collector-app-backend-m3)

[Deploy Link](deploy)

### Slides

[Slides Link](slides)