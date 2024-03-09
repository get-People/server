import { Router, Request, Response } from "express"
import Country from "../models/country";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const country = await Country.create({name: req.body.name});

        res.status(200).send(country)
    } catch (err) {
        console.error(err)
        res.status(500).send({errorMessage: "error when creating country "})
    }
})

export default router;