(()=>{var e={317:(e,r,s)=>{const t=s(436);t.init({dsn:"https://d773c731df0df3356dffd58d1cb6612e@o4507123081412608.ingest.de.sentry.io/4507441037770832",integrations:[t.rewriteFramesIntegration()]})},412:(e,r,s)=>{const t=s(37);s(818).config(),e.exports=async()=>{try{await t.connect(process.env.MONGOURL),console.log("MongoDB is Connected...")}catch(e){console.error(e.message)}}},930:(e,r,s)=>{const t=s(571),n=s(486),o=s(829),a=s(652),{successResponse:i,catchResponse:d,errorResponse:u}=s(640);e.exports={Register:async(e,r)=>{try{const{email:s,username:a,password:i}=e.body;let d=await t.findOne({username:a});d&&(d.is_verified?u(r,"Username already taken"):await t.deleteOne({username:a}));let c=await t.findOne({email:s});c&&(c.is_verified?u(r,"Email already taken"):await t.deleteOne({email:s}));const p=await n.hash(i,14),l=await o.sign({username:a,email:s},process.env.JWT_SECRET,{expiresIn:"1h"}),m=new t({email:s,username:a,password:p,is_verified:!0,token:l});return await m.save(),r.json({message:"User registered",token:m.token,success:1})}catch(e){d(r,"Server Error",e)}},Login:async(e,r)=>{try{const{username:s,password:o}=e.body,a=await t.findOne({username:s});if(a&&a.is_verified){if(await n.compare(o,a.password))return console.log(`Username: ${a.username} is logged-in successfully with email: ${a.email}`),r.json({message:"Login successfully",token:a.token});u(r,"Username or Password not match")}else u(r,"User not exist")}catch(e){d(r,"Server Error",e)}},UserDataProvider:async(e,r)=>{const{token:s}=e.body;if(s){const e=await t.findOne({token:s});return e?r.json({email:e.email,username:e.username}):r.json({error:"Invalid token"})}return r.json({error:"Invalid token"})},userProfileInfo:async(e,r)=>{if(e.user){const s=e.user,t=s._id,n=await a.find({userId:t});return r.status(200).json({email:s.email,username:s.username,address:s.address,phone_number:s.phone_number,orderData:n})}return r.status(404).json({error:"Invalid token"})},userUpdateProfile:async(e,r)=>{const{username:s,address:n,phone_number:o}=e.body;try{return await t.findOneAndUpdate({username:s},{address:n,phone_number:o}),r.status(200).json({message:"Profile updated successfully"})}catch(e){return r.status(404).json({error:"Invalid token"})}}}},868:(e,r,s)=>{const t=s(291),n=s(74),o=s(652),a=s(37);e.exports={AllRestaurentFinder:async(e,r)=>{try{const e=await t.find();r.status(200).json(e)}catch(e){r.status(500).json({error:e.message})}},RestaurantByIdFinder:async(e,r)=>{try{const{id:s}=e.params,o=await t.findById(s),a=await n.find({restaurentId:o._id});r.status(200).json({restaurant:o,products:a||[]})}catch(e){r.status(500).json({error:e.message})}},AddOrder:async(e,r)=>{try{const{orderItems:s,shippingAddress:t,price:n,shippingPrice:i,totalPrice:d}=e.body,u=new o({userId:new a.Types.ObjectId(e.user._id),orderItems:s,shippingAddress:t,price:n,shippingPrice:i,totalPrice:d});await u.save(),r.status(200).json({message:"Order added successfully"})}catch(e){console.log(e),r.status(500).json({error:e.message})}}}},239:(e,r,s)=>{const t=s(571);e.exports={userAuthenticate:async(e,r,s)=>{const n=e.headers.authorization;if(!n)return r.status(404).json({error:"Invalid token"});{const o=await t.findOne({token:n});if(!o)return r.status(404).json({error:"Invalid token"});e.user=o,s()}}}},652:(e,r,s)=>{const t=s(37),n=new t.Schema({userId:{type:t.Schema.Types.ObjectId,ref:"User",required:!0},orderItems:[{name:{type:String,required:!0},quantity:{type:Number,required:!0},price:{type:Number,required:!0},productId:{type:t.Schema.Types.ObjectId,ref:"RestaurantProduct",required:!0}}],shippingAddress:{type:String,required:!0},price:{type:Number,required:!0,default:0},shippingPrice:{type:Number,required:!0,default:0},totalPrice:{type:Number,required:!0,default:0},isDelivered:{type:Boolean,required:!0,default:!1},deliveredAt:{type:Date}},{timestamps:!0});t.pluralize(null),e.exports=t.model("Order",n)},74:(e,r,s)=>{const t=s(37),n=new t.Schema({restaurentId:{type:t.Schema.Types.ObjectId,ref:"Restaurent",required:!0},name:{type:String,required:!0,trim:!0},price:{type:Number,required:!0},image:{type:String,required:!0},category:{type:String,required:!0},description:{type:String,required:!0}},{timestamps:!0});t.pluralize(null),e.exports=t.model("RestaurentProduct",n)},291:(e,r,s)=>{const t=s(37),n=new t.Schema({name:{type:String,required:!0,trim:!0},address:{type:String,required:!0,trim:!0},image:{type:String,required:!0,trim:!0},famous:{type:String,required:!0,trim:!0},rating:{type:Number,default:0,validate:{validator:function(e){return e>=0&&e<=5},message:e=>`${e.value} is not a valid rating!`}},phone_number:{type:String,validate:{validator:function(e){return!e||/^[1-9][0-9]{9}$/.test(e)},message:e=>`${e.value} is not a valid phone number!`},required:!0}},{timestamps:!0});t.pluralize(null),e.exports=t.model("Restaurent",n)},571:(e,r,s)=>{const t=s(37),n=new t.Schema({email:{unique:!0,type:String,required:!0,trim:!0},username:{unique:!0,type:String,required:!0,trim:!0},password:{type:String,required:!0},address:String,phone_number:{type:String,validate:{validator:function(e){return!e||/^[1-9][0-9]{9}$/.test(e)},message:e=>`${e.value} is not a valid phone number!`}},is_verified:{type:Boolean,required:!0},token:{type:String,required:!0}},{timestamps:!0});t.pluralize(null),n.index({email:1,username:1},{unique:!0}),e.exports=t.model("Users",n)},753:(e,r,s)=>{const{Register:t,Login:n,UserDataProvider:o,userProfileInfo:a,userUpdateProfile:i}=s(930),{userAuthenticate:d}=s(239),u=s(252).Router(),c=s(268).urlencoded({extended:!1});u.post("/register",c,t),u.post("/login",c,n),u.post("/user",c,o),u.get("/profile",d,a),u.post("/update-profile",c,d,i),e.exports=u},837:(e,r,s)=>{const{AllRestaurentFinder:t,RestaurantByIdFinder:n,AddOrder:o}=s(868),a=s(252).Router(),i=s(268).urlencoded({extended:!1}),{userAuthenticate:d}=s(239);a.get("/restaurent/all",t),a.get("/restaurent/:id",n),a.post("/restaurent/add-order",i,d,o),e.exports=a},640:(e,r,s)=>{const t=s(436);e.exports={successResponse:(e,r)=>e.json({message:r}),errorResponse:(e,r)=>(t.captureMessage(r),e.json({error:r,success:0})),catchResponse:(e,r,s)=>(t.captureException(s,r),console.log(s),e.status(500).json({error:r,success:0}))}},436:e=>{"use strict";e.exports=require("@sentry/node")},486:e=>{"use strict";e.exports=require("bcrypt")},268:e=>{"use strict";e.exports=require("body-parser")},898:e=>{"use strict";e.exports=require("cookie-parser")},577:e=>{"use strict";e.exports=require("cors")},818:e=>{"use strict";e.exports=require("dotenv")},252:e=>{"use strict";e.exports=require("express")},829:e=>{"use strict";e.exports=require("jsonwebtoken")},37:e=>{"use strict";e.exports=require("mongoose")},928:e=>{"use strict";e.exports=require("path")},330:e=>{"use strict";e.exports=JSON.parse('{"name":"backend","version":"1.0.1","description":"","main":"server.js","scripts":{"test":"cross-env NODE_ENV=test jest --testTimeout=5000","start":"nodemon server.js","build:dev":"webpack --config webpack.config.js --mode development","build:prod":"webpack --config webpack.config.js --mode production","dev":"node ./dist/main.js"},"keywords":[],"author":"","license":"ISC","dependencies":{"@sentry/node":"^8.9.2","bcrypt":"^5.1.1","body-parser":"^1.20.2","cookie-parser":"^1.4.6","cors":"^2.8.5","cross-env":"^7.0.3","dotenv":"^16.3.1","express":"^4.18.2","jest":"^29.7.0","jsonwebtoken":"^9.0.2","mongoose":"^8.0.0","nodemon":"^3.1.0","supertest":"^6.3.4"},"devDependencies":{"@babel/core":"^7.23.9","babel-loader":"^9.1.3","webpack":"^5.90.3","webpack-cli":"^5.1.4","webpack-node-externals":"^3.0.0"}}')}},r={};function s(t){var n=r[t];if(void 0!==n)return n.exports;var o=r[t]={exports:{}};return e[t](o,o.exports,s),o.exports}(()=>{s(317);const e=s(252),r=e(),t=s(577),n=(s(818).config(),process.env.PORT||80),o=s(412),a=s(753),i=s(898),d=s(837),u=s(928),c=process.env.ENVIRONMENT,p="production"===c?process.env.FRONTEND_BASE_URL:"http://localhost:3000",l=s(436),m=s(330);o(),r.use(i({})),r.use(t()),console.log("Node environment:",c),console.log("Frontend URL:",p),r.use("/images/restaurant",e.static(u.join(__dirname,"production"===c?"../src/Images/restaurant":"./src/Images/restaurant"))),r.use("/images/product",e.static(u.join(__dirname,"production"===c?"../src/Images/product":"./src/Images/product"))),r.use(e.json()),r.get("/",((e,r)=>{r.send({version:m.version})})),r.use("/api/auth",a),r.use("/api",d),l.setupExpressErrorHandler(r),r.listen(n,(()=>{console.log(`Server is running on port ${n}`)}))})()})();