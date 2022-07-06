package pl.polsl.shop.user;

import pl.polsl.shop.user.rest.UserDto;

import java.util.List;
import java.util.Objects;

public enum UserSearchStrategy {
    ID {
        @Override
        public List<User> findUsers(UserDto userDto, UserRepository userRepository) {
            return userRepository.findAllByType(userDto.type()).stream()
                    .filter(user -> Objects.equals(user.getId(), userDto.id()))
                    .toList();
        }
    }, NAME {
        @Override
        public List<User> findUsers(UserDto userDto, UserRepository userRepository) {
            return userRepository.findAllByLegalNameAndSurnameAndType(userDto.legalName(), userDto.surname(), userDto.type());
        }
    }, PERSONAL_NUMBER {
        @Override
        public List<User> findUsers(UserDto userDto, UserRepository userRepository) {
            return userRepository.findAllByPeselAndType(userDto.pesel(), userDto.type());
        }
    };

    public static UserSearchStrategy getStrategyFor(UserDto userDto) {
        if (userDto.legalName() != null && userDto.surname() != null) {
            return NAME;
        } else if (userDto.pesel() != null) {
            return PERSONAL_NUMBER;
        } else {
            return ID;
        }
    }

    public abstract List<User> findUsers(UserDto userDto, UserRepository userRepository);

}
