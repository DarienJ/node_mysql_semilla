let texto = 'Funcionando';
const llamar = (req, res)=> {
  res.json({
    texto
  })
}

export default llamar;