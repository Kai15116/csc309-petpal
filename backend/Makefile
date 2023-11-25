# This is copied from lecture example code (lec10)

#
# To help clean-up and zip up everything
#

NOADD    := db.sqlite3 $(wildcard *.tar)
FILES    := $(filter-out $(NOADD), $(wildcard *))
OUTPUT   := $(notdir $(abspath .))
JSONFILE := $(OUTPUT).json
TARFILE  := $(OUTPUT).tar

all: reset

reset: clean
	./manage.py makemigrations
	./manage.py migrate
ifeq ($(JSONFILE),$(wildcard $(JSONFILE)))
	./manage.py loaddata $(JSONFILE)
endif

.PHONY: clean zip
clean:
	rm -rf */__pycache__/ */*/__pycache__/ */*/*/__pycache__/ */migrations/0*.py $(NOADD)

zip: clean
	tar cvf $(TARFILE) $(FILES)
