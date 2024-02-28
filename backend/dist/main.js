(()=>{var e={412:(e,r,t)=>{const s=t(37);t(818).config(),e.exports=async()=>{try{await s.connect(process.env.MONGOURL),console.log("MongoDB is Connected...")}catch(e){console.error(e.message)}}},930:(e,r,t)=>{const s=t(571),n=t(486),i=t(829),a=t(652);e.exports={Register:async(e,r)=>{try{const{email:t,username:a,password:o}=e.body;let u=await s.findOne({username:a});if(u){if(u.is_verified)return r.json({error:"Username already taken"});await s.deleteOne({username:a})}let d=await s.findOne({email:t});if(d){if(d.is_verified)return r.json({error:"Email already taken"});await s.deleteOne({email:t})}const c=await n.hash(o,14),p=await i.sign({username:a,email:t},process.env.JWT_SECRET,{expiresIn:"1h"}),l=new s({email:t,username:a,password:c,is_verified:!0,token:p});await l.save(),r.json({message:"User registered"})}catch(e){console.log(e),r.status(500).json({error:"Server Error"})}},Login:async(e,r)=>{try{const{username:t,password:i}=e.body,a=await s.findOne({username:t});return a&&a.is_verified?await n.compare(i,a.password)?(console.log(`Username: ${a.username} is logged-in successfully with email: ${a.email}`),r.json({message:"Login successfully",token:a.token})):r.json({error:"Username or Password not match"}):r.json({error:"User not exist"})}catch(e){console.log(e),r.status(500).json({error:"Server Error"})}},UserDataProvider:async(e,r)=>{const{token:t}=e.body;if(t){const e=await s.findOne({token:t});return e?r.json({email:e.email,username:e.username}):r.json({error:"Invalid token"})}return r.json({error:"Invalid token"})},userProfileInfo:async(e,r)=>{if(e.user){const t=e.user,s=t._id,n=await a.find({userId:s});return r.status(200).json({email:t.email,username:t.username,address:t.address,phone_number:t.phone_number,orderData:n})}return r.status(404).json({error:"Invalid token"})},userUpdateProfile:async(e,r)=>{const{username:t,address:n,phone_number:i}=e.body;try{return await s.findOneAndUpdate({username:t},{address:n,phone_number:i}),r.status(200).json({message:"Profile updated successfully"})}catch(e){return r.status(404).json({error:"Invalid token"})}}}},868:(e,r,t)=>{const s=t(291),n=t(74),i=t(652),a=t(37);e.exports={AllRestaurentFinder:async(e,r)=>{try{const e=await s.find();r.status(200).json(e)}catch(e){r.status(500).json({error:e.message})}},RestaurantByIdFinder:async(e,r)=>{try{const{id:t}=e.params,i=await s.findById(t),a=await n.find({restaurentId:i._id});r.status(200).json({restaurant:i,products:a||[]})}catch(e){r.status(500).json({error:e.message})}},AddOrder:async(e,r)=>{try{const{orderItems:t,shippingAddress:s,price:n,shippingPrice:o,totalPrice:u}=e.body,d=new i({userId:new a.Types.ObjectId(e.user._id),orderItems:t,shippingAddress:s,price:n,shippingPrice:o,totalPrice:u});await d.save(),r.status(200).json({message:"Order added successfully"})}catch(e){console.log(e),r.status(500).json({error:e.message})}}}},239:(e,r,t)=>{const s=t(571);e.exports={userAuthenticate:async(e,r,t)=>{const n=e.headers.authorization;if(!n)return r.status(404).json({error:"Invalid token"});{const i=await s.findOne({token:n});if(!i)return r.status(404).json({error:"Invalid token"});e.user=i,t()}}}},652:(e,r,t)=>{const s=t(37),n=new s.Schema({userId:{type:s.Schema.Types.ObjectId,ref:"User",required:!0},orderItems:[{name:{type:String,required:!0},quantity:{type:Number,required:!0},price:{type:Number,required:!0},productId:{type:s.Schema.Types.ObjectId,ref:"RestaurantProduct",required:!0}}],shippingAddress:{type:String,required:!0},price:{type:Number,required:!0,default:0},shippingPrice:{type:Number,required:!0,default:0},totalPrice:{type:Number,required:!0,default:0},isDelivered:{type:Boolean,required:!0,default:!1},deliveredAt:{type:Date}},{timestamps:!0});s.pluralize(null),e.exports=s.model("Order",n)},74:(e,r,t)=>{const s=t(37),n=new s.Schema({restaurentId:{type:s.Schema.Types.ObjectId,ref:"Restaurent",required:!0},name:{type:String,required:!0,trim:!0},price:{type:Number,required:!0},image:{type:String,required:!0},category:{type:String,required:!0},description:{type:String,required:!0}},{timestamps:!0});s.pluralize(null),e.exports=s.model("RestaurentProduct",n)},291:(e,r,t)=>{const s=t(37),n=new s.Schema({name:{type:String,required:!0,trim:!0},address:{type:String,required:!0,trim:!0},image:{type:String,required:!0,trim:!0},famous:{type:String,required:!0,trim:!0},rating:{type:Number,default:0,validate:{validator:function(e){return e>=0&&e<=5},message:e=>`${e.value} is not a valid rating!`}},phone_number:{type:String,validate:{validator:function(e){return!e||/^[1-9][0-9]{9}$/.test(e)},message:e=>`${e.value} is not a valid phone number!`},required:!0}},{timestamps:!0});s.pluralize(null),e.exports=s.model("Restaurent",n)},571:(e,r,t)=>{const s=t(37),n=new s.Schema({email:{unique:!0,type:String,required:!0,trim:!0},username:{unique:!0,type:String,required:!0,trim:!0},password:{type:String,required:!0},address:String,phone_number:{type:String,validate:{validator:function(e){return!e||/^[1-9][0-9]{9}$/.test(e)},message:e=>`${e.value} is not a valid phone number!`}},is_verified:{type:Boolean,required:!0},token:{type:String,required:!0}},{timestamps:!0});s.pluralize(null),n.index({email:1,username:1},{unique:!0}),e.exports=s.model("Users",n)},753:(e,r,t)=>{const{Register:s,Login:n,UserDataProvider:i,userProfileInfo:a,userUpdateProfile:o}=t(930),{userAuthenticate:u}=t(239),d=t(252).Router(),c=t(268).urlencoded({extended:!1});d.post("/register",c,s),d.post("/login",c,n),d.post("/user",c,i),d.get("/profile",u,a),d.post("/update-profile",c,u,o),e.exports=d},837:(e,r,t)=>{const{AllRestaurentFinder:s,RestaurantByIdFinder:n,AddOrder:i}=t(868),a=t(252).Router(),o=t(268).urlencoded({extended:!1}),{userAuthenticate:u}=t(239);a.get("/restaurent/all",s),a.get("/restaurent/:id",n),a.post("/restaurent/add-order",o,u,i),e.exports=a},486:e=>{"use strict";e.exports=require("bcrypt")},268:e=>{"use strict";e.exports=require("body-parser")},898:e=>{"use strict";e.exports=require("cookie-parser")},577:e=>{"use strict";e.exports=require("cors")},818:e=>{"use strict";e.exports=require("dotenv")},252:e=>{"use strict";e.exports=require("express")},829:e=>{"use strict";e.exports=require("jsonwebtoken")},37:e=>{"use strict";e.exports=require("mongoose")},928:e=>{"use strict";e.exports=require("path")}},r={};function t(s){var n=r[s];if(void 0!==n)return n.exports;var i=r[s]={exports:{}};return e[s](i,i.exports,t),i.exports}(()=>{const e=t(252),r=e(),s=t(577),n=(t(818).config(),process.env.PORT||8e3),i=t(412),a=t(753),o=t(898),u=t(837),d=t(928);i(),r.use(e.static(d.join(__dirname,"../../frontend/build/"))),r.use(o()),r.use(s({origin:"http://localhost:3000",credentials:!0})),r.use("/images/restaurant",e.static(d.join(__dirname,"/src/Images/restaurant"))),r.use("/images/product",e.static(d.join(__dirname,"/src/Images/product"))),r.use(e.json()),r.use("/api/auth",a),r.use("/api",u),r.listen(n,(()=>{console.log(`Server is running on port ${n}`)}))})()})();