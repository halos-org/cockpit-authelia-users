import {
  Button,
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  Label,
  LabelGroup,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  TextInput,
} from "@patternfly/react-core";
import { useEffect, useRef, useState } from "react";

const DEFAULT_GROUPS = ["admins", "users", "guests"];

export interface GroupInputProps {
  value: string[];
  onChange: (groups: string[]) => void;
  availableGroups?: string[];
  isLoading?: boolean;
  isDisabled?: boolean;
  error?: string;
}

export function GroupInput({
  value,
  onChange,
  availableGroups = [],
  isLoading = false,
  isDisabled = false,
  error,
}: GroupInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Combine default groups with API groups, deduplicated
  const allGroups = [...new Set([...DEFAULT_GROUPS, ...availableGroups])].sort();

  // Filter suggestions based on input and exclude already selected
  const suggestions = allGroups.filter(
    (group) => !value.includes(group) && group.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Show menu when typing and there are suggestions
  useEffect(() => {
    if (inputValue.length > 0 && suggestions.length > 0) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [inputValue, suggestions.length]);

  const addGroup = (group: string) => {
    const trimmedGroup = group.trim().toLowerCase();
    if (trimmedGroup && !value.includes(trimmedGroup)) {
      onChange([...value, trimmedGroup]);
    }
    setInputValue("");
    setIsMenuOpen(false);
    inputRef.current?.focus();
  };

  const removeGroup = (group: string) => {
    onChange(value.filter((g) => g !== group));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      addGroup(inputValue);
    } else if (event.key === "Escape") {
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (_event: React.FormEvent, newValue: string) => {
    setInputValue(newValue);
  };

  const handleMenuSelect = (
    _event: React.MouseEvent | undefined,
    itemId: string | number | undefined
  ) => {
    if (typeof itemId === "string") {
      addGroup(itemId);
    }
  };

  return (
    <FormGroup label="Groups" fieldId="groups">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* Selected groups as labels */}
        {value.length > 0 && (
          <LabelGroup categoryName="Selected groups">
            {value.map((group) => (
              <Label key={group} onClose={isDisabled ? undefined : () => removeGroup(group)}>
                {group}
              </Label>
            ))}
          </LabelGroup>
        )}

        {/* Input with autocomplete */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <TextInput
              ref={inputRef}
              id="groups-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (inputValue.length > 0 && suggestions.length > 0) {
                  setIsMenuOpen(true);
                }
              }}
              placeholder={isLoading ? "Loading groups..." : "Type to add group"}
              isDisabled={isDisabled || isLoading}
              aria-label="Add group"
            />
            <Button
              variant="secondary"
              onClick={() => addGroup(inputValue)}
              isDisabled={!inputValue.trim() || isDisabled || isLoading}
            >
              Add
            </Button>
          </div>

          {/* Suggestions dropdown */}
          {isMenuOpen && suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 1000,
                marginTop: "4px",
              }}
            >
              <Menu onSelect={handleMenuSelect} isScrollable>
                <MenuContent>
                  <MenuList>
                    {suggestions.map((group) => (
                      <MenuItem key={group} itemId={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </MenuList>
                </MenuContent>
              </Menu>
            </div>
          )}
        </div>
      </div>

      {error && (
        <FormHelperText>
          <HelperText>
            <HelperTextItem variant="error">{error}</HelperTextItem>
          </HelperText>
        </FormHelperText>
      )}
    </FormGroup>
  );
}
