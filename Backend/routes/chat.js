import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
const router = express.Router();    

router.post("/test", async(req, res) => {
    try {
        const thread = new Thread({
            threadId: "test",
            title: "test",
        });
        const response = await thread.save();
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});

//Get all Threads
router.get("/thread", async(req, res) => {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1});
        res.json(threads);
    } catch (error) {
        console.log(error);
    }
});

//Get a particular thread
router.get("/thread/:threadId", async(req, res) => {
    try {
        const thread = await Thread.findOne({threadId: req.params.threadId});
        if(!thread){
            res.status(404).json({message: "Thread not found"});
        }
        res.json(thread.messages);
    } catch (error) {
        console.log(error);
    }
    
})

//Delete thread
router.delete("/thread/:threadId", async(req, res) => {
    try {
        const DeletedThread = await Thread.findOneAndDelete({threadId: req.params.threadId});
        if(!DeletedThread){
            res.status(404).json({message: "Thread not found"});
        }
        res.status(200).json({success: "Thread deleted"});
    } catch (error) {
        console.log(error);
    }
})

//Post route
router.post("/chat", async(req, res) => {
    const {threadId, message} = req.body;
    if(!threadId || !message){
        return res.status(400).json({message: "Thread ID and message are required"});
    }

    try {
        let thread = await Thread.findOne({threadId});
        if(!thread){
            thread = new Thread({
                threadId,
                title: message,
                messages:[{role: "user", content: message}]
            });
        }
        else{
            thread.messages.push({role: "user", content: message});
        }

        const assistantReply = await getOpenAIAPIResponse(message);
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = Date.now();
        await thread.save();
        res.json({reply: assistantReply});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
})




export default router;