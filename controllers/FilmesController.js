import dbknex from "../data/db_config.js";

export const getFilmes = async (req, res) => {
  try {
    const filmes = await dbknex.select("*").from("filmes");
    res.status(200).json(filmes);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro" + error.message });
  }
};

export const createFilme = async (req, res) => {
  const { nome, categoria, ano_Lancamento } = req.body;

  if (!nome || !categoria || !ano_Lancamento) {
    res.status(400).json({
      id: 0,
      msg: "Erro... informe nome, categoria e ano_Lancamento",
    });
    return;
  }

  try {
    const newFilm = await dbknex("filmes").insert({
      nome,
      categoria,
      ano_Lancamento,
    });
    res
      .status(200)
      .json({ id: newFilm[0], msg: "Filme incluído com sucesso!" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro " + error.message });
  }
};

export const updateFilme = async (req, res) => {
  const { nome, categoria, ano_Lancamento } = req.body;
  const { id } = req.params;

  try {
    await dbknex("filmes")
      .where({ id })
      .update({ nome, categoria, ano_Lancamento });
    res.status(200).json({ id, msg: "Filme alterado com sucesso!" });
  } catch (error) {
    res.status(400).json({ id, msg: "Erro: " + error.message });
  }
};

export const deleteFilme = async (req, res) => {
  const { id } = req.params;

  try {
    await dbknex("filmes").where({ id }).del();
    res.status(200).json({ id, msg: "Filme deletado com sucesso!" });
  } catch (error) {
    res.status(400).json({ id, msg: "Erro " + error.message });
  }
};

export const pesqFilme = async (req, res) => {
  const { nome } = req.params;

  try {
    const filme = await dbknex("filmes")
      .whereLike("nome", `%${nome}%`)
      .orderBy("nome");
    res.status(200).json(filme);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro " + error.message });
  }
};

export const pesqAno = async (req, res) => {
  const { from, to } = req.params;

  try {
    const filmes = await dbknex("filmes")
      .whereBetween("ano_lancamento", [from, to])
      .orderBy("ano_lancamento");
    res.status(200).json(filmes);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};
