using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FI.AtividadeEntrevista.DML
{
    public class ClienteBeneficiario
    {
        public Beneficiario Beneficiario { get; set; }
        public Cliente Cliente { get; set; }
    }
}