import { Router, Request, Response } from "express"
import Street from "../models/street";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const street = await Street.create({
            name: req.body.name,
            city_id: req.body.city_id,
        })

        res.status(200).send(street)
    } catch (err) {
        console.error(err)
        res.status(500).send({errorMessage: "error when creating street "})
    }
})

export default router;
