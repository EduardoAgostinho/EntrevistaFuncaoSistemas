using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FI.WebAtividadeEntrevista.Models
{
    public class ClienteBeneficiarioModel
    {
        public Beneficiario Beneficiario { get; set; }
        public Cliente Cliente { get; set; }
    }
}