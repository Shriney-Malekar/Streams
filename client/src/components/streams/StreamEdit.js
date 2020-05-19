import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../action';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    };
    render() {
        if(!this.props.stream){
            return <div>Loading...</div>
        }
        const { title, description } = this.props.stream;
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    initialValues={{ title, description }} // This is part of redux form it will take initial values and assign to input for this the name and this object keys should be same.
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
    }
};

const mapsStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapsStateToProps, { fetchStream, editStream })(StreamEdit);