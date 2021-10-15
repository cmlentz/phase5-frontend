import styled from 'styled-components/macro';

const Wrapper = styled.article`
  max-width: 375px;
  border-radius: 35px;
  padding: 50px;
  background: Cornsilk;
  box-shadow: 0px 2px 20px hsl(0, 100%, 40%);
  text-align: center;
`

const Avatar = styled.img`
  display: block;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: -50px;
  margin-bottom: 5px;
`

const CardHeading = styled.h2`
  font-size: 1.50rem;
  font-weight: 600;
  margin-bottom: 0px;
`

const CardLocation = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: hsl(0deg 0% 40%);
`

const CardEmail = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: hsl(0deg 0% 40%);
`

export default function ContactCard({
  avatarSrc,
  name,
  location,
  email
}) {
  return (
    <Wrapper>
      <Avatar
        alt="smiley"
        src={avatarSrc}
      />
      <CardHeading>{name}</CardHeading>
      <CardLocation>{location}</CardLocation>
      <CardEmail>{email}</CardEmail>
    </Wrapper>
  );
}