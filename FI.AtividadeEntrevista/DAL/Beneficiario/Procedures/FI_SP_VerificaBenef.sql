﻿Create PROC FI_SP_VerificaBenef
	@CPF VARCHAR(11)
AS
BEGIN
	SELECT 1 FROM CLIENTES WHERE CPF = @CPF
END
