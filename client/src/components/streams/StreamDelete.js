import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../action';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }
    render() {
        const { id } = this.props.match.params;
        return (
            <div>
                <Modal dismiss={()=>history.push("/")}>
                    <div className="header">Delete Stream</div>
                    <div className="content">
                        {this.props.stream ? `Are you sure you want to delete stream: ${this.props.stream.title}` : "Are you sure you want to delete the stream?"}
                    </div>
                    <div className="actions">
                        <button onClick={() => this.props.deleteStream(id)} className="ui button primary">Delete</button>
                        <button onClick={() => history.goBack()} className="ui button">Cancel</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);