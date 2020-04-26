import React,{Component} from 'react';

class ListaPessoas extends Component{


    constructor(props){
        super(props)

        this.editForm = this.editForm.bind(this)
        this.deletePessoa = this.deletePessoa.bind(this)
       
    }

    deletePessoa(e, pessoa) {
        e.preventDefault();
    
        if (this.props.removeClick) {
          this.props.removeClick(pessoa);
        }
      };

      editForm (e) {
        if (this.props.mudarForm) {
            console.log("ok");
            this.props.mudarForm(e)
        } else {
            console.log("erro");
        }
    }

    render(){
        return(
            <>
            <table style={{textAlign:'center'}}>
                <thead >
                    <tr>
                    <th >ID</th>
                    <th >Nome</th>
                    <th >Email</th>
                    <th >Senha</th>
                    <th >Excluir</th>
                    <th >Editar</th>
      
                    </tr>
                </thead>
                <tbody style={{textAlign:'center'}}>
                {
                    this.props.pessoas && this.props.pessoas.length > 0 ?
                        this.props.pessoas.map( (pessoa,i) => {
                            console.log('pessoa',pessoa)
                            return (
                                     <tr key={i} >
                                        <td> {pessoa.id} </td>
                                        <td>  {pessoa.nome }</td>
                                        <td> {pessoa.email} </td>
                                        <td> {pessoa.senha} </td>
                                        <td><button  type="submit" onClick={e => this.deletePessoa(e, pessoa)}>Excluir</button></td>
                                        <td><button  onClick={this.editForm}>Editar</button></td>
                                    </tr>
                            ) 
                        })
                        :
                        null
                } 
                </tbody>
            </table>
            </>
        )
    }

}

export default ListaPessoas;