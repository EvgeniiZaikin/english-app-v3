import { connect } from 'react-redux';

function IndexPage({ tick }) {
    return <div>Hello World Next - Typescript - Express - { tick }</div>;
}

export default connect(state => state)(IndexPage);