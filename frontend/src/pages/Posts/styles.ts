import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px;
  
  ul {
    display: flex;
    flex-direction: column;
    list-style: none;

    width: 100%;
    max-width: 630px;
    margin: 0 auto;

    a {
      padding: 16px;
      cursor: pointer;
      border: 1px solid #999;

      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        background: #e1e1e1;
      }

      & + a {
        margin-top: 16px;
      }

      div button {
        padding: 8px;

        & + button {
          margin-left: 16px;
        }
      }
    }
  }
`