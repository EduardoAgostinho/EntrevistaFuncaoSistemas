CREATE PROC FI_SP_AltBenef
    @Id            BIGINT,
	@CPF           VARCHAR (11),
	@NOME          VARCHAR (50),
	
AS
BEGIN
	UPDATE CLIENTES 
	SET 
		NOME = @NOME, 
		CPF = @CPF 
	WHERE Id = @Id
END