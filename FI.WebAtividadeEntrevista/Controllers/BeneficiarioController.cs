using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using FI.WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FI.WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        // GET: Beneficiario
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (bo.VerificarExistencia(model.CPFB.Replace(".", "").Replace("-", "")))
                {
                    return Json("CPF já cadastrado!");
                }
                else
                {
                    model.Id = bo.Incluir(new Beneficiario()
                    {
                        CPF = model.CPFB.Replace(".", "").Replace("-", ""),
                        Nome = model.NomeB,
                        IdCliente = model.IdCliente
                    });

                    return Json("Cadastro efetuado com sucesso");
                }
            }
        }

        [HttpPost]
        public JsonResult Alterar(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (bo.VerificarExistencia(model.CPFB.Replace(".", "").Replace("-", "")))
                {
                    return Json("CPF já cadastrado!");
                }
                else
                {
                    bo.Alterar(new Beneficiario()
                    {
                        Id = model.Id,
                        CPF = model.CPFB.Replace(".", "").Replace("-", ""),
                        Nome = model.NomeB,
                        IdCliente = model.IdCliente
                    });

                    return Json("Cadastro alterado com sucesso");
                }
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            Beneficiario beneficiario = bo.Consultar(id);
            Models.BeneficiarioModel model = null;

            if (beneficiario != null)
            {
                model = new BeneficiarioModel()
                {
                    Id = beneficiario.Id,
                    CPFB = beneficiario.CPF,
                    NomeB = beneficiario.Nome,
                    IdCliente = beneficiario.IdCliente,
                    
                };

            }

            return View(model);
        }

        [HttpPost]
        public JsonResult BeneficiarioList()
        {
            try
            {
                List<Beneficiario> beneficiarios = new BoBeneficiario().Pesquisa();

                return Json(new { Result = "OK", Records = beneficiarios });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}