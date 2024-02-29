import { Router, Request, Response } from "express"
import City from "../models/city";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const city = await City.create({
            name: req.body.name,
            country_id: req.body.country_id,
        })

        res.status(200).send(city)
    } catch (err) {
        console.error(err)
        res.status(500).send({errorMessage: "error when creating city "})
    }
})

export default router;