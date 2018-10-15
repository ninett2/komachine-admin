import React from 'react';
import Link from 'next/link'
import {inject, observer} from 'mobx-react';

@inject(({store}) => {
  return {companyStore: store.companyStore};
})
@observer
class CompanyList extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickPage = this.handleClickPage.bind(this);
  }

  componentDidMount() {
  }

  handleClickPage = (page) => {
    console.log(page);
    const {companyStore} = this.props;
    companyStore.fetchCompanies({page});
  };


  render() {
    const {query, companyStore} = this.props;
    const {list, table} = companyStore;
    const listComponent = list.map((id) => (
      <span key={id}>{id}, </span>
    ));
    const tableComponent = Object.keys(table).map((key) => (
      <div key={key}>
        {key}, {table[key].slug}
      </div>
    ));
    return (
      <div>
        <div>
          {companyStore.state}
        </div>
        <div>
          Page: {companyStore.page}
        </div>
        <div>
          List: {listComponent}
        </div>
        <div>
          <h3>Table</h3>
          {tableComponent}
          <br/>
        </div>
        <div>
          <Link href="/companies?page=1"><a>1</a></Link>
          <Link href="/companies?page=2"><a>2</a></Link>
          <Link href="/companies?page=3"><a>3</a></Link>
        </div>
      </div>
    );
  }
}

export default CompanyList;