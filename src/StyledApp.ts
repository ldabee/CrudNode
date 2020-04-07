import styled from 'styled-components';

// export const Body = styled.div`
//     // display:flex;
// `
export const Title = styled.h1({
    fontWeight: "bold",
    color: "lightgrey",
    textAlign: "center",
    fontSize: "35px",
    width: "79%",
    float: "right",
    maxWidth: "calc(100% - 310px)",
    marginRight: "15px",
})

export const UserWrapper = styled.div({
    width: "285px",
    position: "absolute",
    bottom: 0,
    top: 0
})
