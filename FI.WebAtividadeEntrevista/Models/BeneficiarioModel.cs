using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FI.WebAtividadeEntrevista.Models
{
    public class BeneficiarioModel
    {
        public long Id { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string NomeB { get; set; }

        /// <summary>
        /// CPF
        /// </summary>
        [Required]
        public string CPFB { get; set; }

        /// <summary>
        /// IdCliente
        /// </summary>
        [Required]
        public long IdCliente { get; set; }
    }
}