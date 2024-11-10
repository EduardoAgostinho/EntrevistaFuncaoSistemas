using FI.AtividadeEntrevista.DAL.Beneficiario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {

        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            return ben.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            ben.Alterar(beneficiario);
        }

        /// <summary>
        /// Consulta o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public DML.Beneficiario Consultar(long id)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            return ben.Consultar(id);
        }

        /// <summary>
        /// Excluir o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            ben.Excluir(id);
        }

        /// <summary>
        /// Lista os beneficiarioa
        /// </summary>
        public List<DML.Beneficiario> Listar()
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            return ben.Listar();
        }

        /// <summary>
        /// Lista os beneficiarios
        /// </summary>
        public List<DML.Beneficiario> Pesquisa()
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            return ben.Pesquisa();
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF)
        {
            DaoBeneficiario cli = new DaoBeneficiario();
            return cli.VerificarExistencia(CPF);
        }
    }
}
