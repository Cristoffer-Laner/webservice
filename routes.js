import { Router, json } from "express";
import {
  createFilme,
  deleteFilme,
  getFilmes,
  pesqAno,
  pesqFilme,
  updateFilme,
} from "./controllers/FilmesController.js";
import {
  createSerie,
  deleteSerie,
  getSeries,
  pesqSerie,
  pesqTemporadas,
  updateSerie,
} from "./controllers/SeriesController.js";
const router = Router();

router.use(json());

router
  .get("/netflix/filmes", getFilmes)
  .post("/netflix/filmes", createFilme)
  .put("/netflix/filmes/:id", updateFilme)
  .delete("/netflix/filmes/:id", deleteFilme)
  .get("/netflix/filmes/pesq/nome/:nome", pesqFilme)
  .get("/netflix/filmes/pesq/ano/:from-:to", pesqAno);

router
  .get("/netflix/series", getSeries)
  .post("/netflix/series", createSerie)
  .put("/netflix/series/:id", updateSerie)
  .delete("/netflix/series/:id", deleteSerie)
  .get("/netflix/series/pesq/nome/:nome", pesqSerie)
  .get("/netflix/series/pesq/ano/:from-:to", pesqTemporadas);

export default router;
